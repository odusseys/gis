import boto3
from api.config import config

sns = boto3.client('sns',
                   aws_access_key_id=config["AWS_ACCESS_KEY_ID"],
                   aws_secret_access_key=config["AWS_SECRET_ACCESS_KEY"])


def post_message(number, message):
    sns.publish(PhoneNumber=number,
                Message=message)
