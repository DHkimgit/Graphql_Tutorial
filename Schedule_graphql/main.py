import typing
import strawberry
from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter

@strawberry.type
class TimeGroup:
    time_group_id: str
    time: [str]
    order: str
    input_person: int
    apply_group: [str]

@strawberry.type
class Roster_Inf:
    roster_id: str
    roster_create_user_servicenumber: str
    roster_name: str
    roster_work_rule: str
    roster_time_group: typing.List[TimeGroup]

@strawberry.type
class Query:
    @strawberry.field
    def user(self) -> str:
        return "hello world"

schema = strawberry.Schema(Query)
graphql_app = GraphQLRouter(schema)

app = FastAPI()

app.include_router(graphql_app, prefix="/graphql")
#uvicorn main:app --reload