from typing import Optional

from api.models.message_models import Message, Thread, ThreadUser, ThreadAdmin, ThreadEvent
from api.models.user_models import User
from api.models.event_models import Event
from api.clients.db import session_scope
from api.util.exceptions import BadRequest, Forbidden


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
                raise Forbidden("You are not allowed to kick this user")
