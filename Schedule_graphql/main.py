from fastapi import FastAPI
from controllers.index import roster_information
app = FastAPI()

app.include_router(roster_information)

