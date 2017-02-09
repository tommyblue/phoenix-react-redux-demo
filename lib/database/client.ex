defmodule Backend.Database.Client do
  def get_all do
    {:ok, db} = Backend.Database.get_db
    Backend.Database.get_all(db)
  end

  def get(id) do
    {:ok, db} = Backend.Database.get_db
    Backend.Database.get(db, id)
  end

  def new(%{"title" => title}) do
    {:ok, db} = Backend.Database.get_db
    id = Backend.Database.get_new_id
    Backend.Database.put(db, id, %{id: id, title: title})
    Backend.Database.get(db, id)
  end

  def update(id, %{"id" => id, "title" => title}) do
    {:ok, db} = Backend.Database.get_db
    Backend.Database.update(db, id, %{id: id, title: title})
    Backend.Database.get(db, id)
  end

  def delete(id) do
    {:ok, db} = Backend.Database.get_db
    Backend.Database.delete(db, id)
  end

  def resolve(id) do
    {:ok, db} = Backend.Database.get_db
    Backend.Database.get(db, id)
  end
end
