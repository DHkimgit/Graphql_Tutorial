import strawberry
import typing

@strawberry.type
class TimeGroup:
    time_group_id: str
    time: [str]
    order: str
    input_person: int
    apply_group: List[str]

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
    def user(self, info, id: int):
        return "hello world"
