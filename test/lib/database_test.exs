defmodule Backend.DatabaseTest do
  use ExUnit.Case, async: true
  alias Backend.Database, as: DB

  setup do
    {:ok, db } = DB.start_link
    {:ok, db: db}
  end

  test "can store a value by key", %{db: db} do
     assert DB.get(db, "test") == nil

     DB.put(db, "test", 5)
     assert DB.get(db, "test") == 5
  end
end
