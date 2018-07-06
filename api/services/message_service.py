from typing import Optional
from datetime import datetime
from sqlalchemy.sql.functions import count
from sqlalchemy import alias
from api.models.message_models import Message, Thread, ThreadUser, ThreadAdmin, ThreadEvent
from api.models.user_models import User
from api.models.event_models import Event
from api.clients.db import session_scope
from api.util.exceptions import BadRequest, Forbidden
from api.util.functional import group_by


MESSAGE_PAGE_SIZE = 25


def get_thread_info(thread_id: int):
    with session_scope() as session:
        thread = session.query(Thread).filter(Thread.id == thread_id).first()
        if thread is None:
            raise BadRequest("No such thread")
        res = dict(id=thread.id, name=thread.name, color=thread.color)
        event = session.query(Event).filter(
            ThreadEvent.thread_id == thread.id,
            ThreadEvent.event_id == Event.id
        ).first()
        if event is not None:
            res["event"] = dict(
                name=event.name,
                image_url=event.image_url,
                start_date=event.start_date
            )
        return res


def create_thread(user_id: int, contact_user_ids: [int], event_id: Optional[int]):
    with session_scope() as session:
        thread = Thread(creator_id=user_id)
        session.add(thread)
        session.flush()
        session.add(ThreadAdmin(user_id=user_id, thread_id=thread.id))
        if event_id is not None:
            session.add(ThreadEvent(user_id=user_id, event_id=event_id))
        for uid in contact_user_ids:
            session.add(ThreadUser(thread_id=thread.id,
                                   user_id=uid,
                                   invited_by=user_id))
        return dict(thread_id=thread.id)


def invite_user(user_id: int, thread_id: int, invited_user_id: int):
    with session_scope() as session:
        session.add(ThreadUser(thread_id=thread_id,
                               user_id=invited_user_id,
                               invited_by=user_id))


def kick_user(user_id: int, thread_id: int, kicked_user_id: int):
    with session_scope() as session:
        thread_user = session.query(ThreadUser).filter(
            ThreadUser.thread_id == thread_id,
            ThreadUser.user_id == kicked_user_id
        ).first()
        if thread_user is None:
            raise BadRequest("No such user to kick")
        if thread_user.invited_by == user_id:
            session.delete(thread_user)
        else:
            admin = session.query(ThreadAdmin).filter(
                ThreadAdmin.thread_user_id == ThreadUser.id,
                ThreadUser.user_id == user_id,
                ThreadUser.thread_id == thread_id
            ).first()
            if admin is not None:
                session.delete(thread_user)
            else:
                raise Forbidden()


def list_threads(user_id: int):
    with session_scope() as session:
        ThreadUser2 = alias(ThreadUser)
        thread_users = session.query(Thread, User.name).filter(
            ThreadUser.user_id == user_id,
            TheadUser.thread_id == Thread.id,
            ThreadUser2.thread_id == Thread.id,
            User.id == ThreadUser2.user_id,
            ThreadUser2.user_id != user_id
        ).all()

        by_thread = group_by(thread_users, by=lambda x: x[0].id)
        results = []
        for _, items in by_thread.items():
            thread = items[0][0]
            user_names = [x[1] for x in items]
            results.append(dict(
                thread=dict(
                    name=thread.name,
                    id=thread.id
                ),
                user_names=user_names
            ))
        return results


def parse_timestamp(timestamp: str):
    raise NotImplementedError("Must parse timestamp")


def post_message(user_id: int,
                 thread_id: int,
                 timestamp: str,
                 content: str,
                 image_url: Optional[str],
                 location_longitude: Optional[int],
                 location_latitude: Optional[int],
                 event_id: Optional[int]):
    timestamp = parse_timestamp(timestamp)
    with session_scope() as session:
        thread_user = session.query(ThreadUser).filter(
            ThreadUser.id == user_id,
            Thread.id == thread_id
        ).first()
        if thread_user is None:
            raise Forbidden()
        message = Message(
            thread_user_id=thread_user.id,
            timestamp=timestamp,
            content=content,
            image_url=image_url,
            location_longitude=location_longitude,
            location_latitude=location_latitude,
            event_id=event_id)
        session.add(message)


def list_messages(user_id: int, thread_id: int, starting_from: Optional[str]):
    if starting_from is None:
        starting_from = datetime.now()
    else:
        starting_from = parse_timestamp(starting_from)

    with session_scope() as session:
        raise NotImplementedError("Check sqlalchemy order by and limit syntax")
