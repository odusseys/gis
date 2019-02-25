from IPython import start_ipython
from api.app import create_app
from api.clients.db import db
from api.models import *
from traitlets.config import Config

c = Config()

# Now we can set options as we would in a config file:
#   c.Class.config_value = value
# For example, we can set the exec_lines option of the InteractiveShellApp
# class to run some code when the IPython REPL starts
c.InteractiveShellApp.exec_lines = [
    '%load_ext autoreload',
    '%autoreload 2',
    'from api.app import create_app',
    'app = create_app()',
    'from api.models import *',
    'from api.clients.db import db'
]

app = create_app()

start_ipython(config=c)
