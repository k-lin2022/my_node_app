from locust import HttpUser, task

class MyUser(HttpUser):
    # 前処理
    def on_start(self):
        # ログインしておく
        self.client.post("/user_sessions", {
            "name": "user1",
            "password": "password"
        })

    # 毎回行う処理
    @task
    def search_todos(self):
        from_date = "2022-05-01"
        to_date = "2022-05-31"
        self.client.get("/todos?fromDate=%s&toDate=%s" % (from_date, to_date),
            name="/todos?")
