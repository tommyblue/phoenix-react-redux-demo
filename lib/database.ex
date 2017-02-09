defmodule Backend.Database do
  alias Backend.Database.Registry, as: Registry

  @doc """
  Start the database
  """
  def start_link do
    Agent.start_link(fn -> %{} end)
  end

  def get_all(db) do
    {:ok, Map.values(Agent.get(db, fn(n) -> n end))}
  end

  @doc """
  Get a value from the db
  """
  def get(db, key) do
    Agent.get(db, &Map.get(&1, key))
  end

  @doc """
  Save a new value in the db
  """
  def put(db, key, value) do
    Agent.update(db, &Map.put(&1, key, value))
  end

  def update(db, key, value) do
    Agent.get_and_update(db, fn db ->
      {key, Map.put(db, key, value)}
    end)
  end

  @doc """
  Delete and return an element
  """
  def delete(db, key) do
    Agent.get_and_update(db, &Map.pop(&1, key))
  end

  def get_new_id do
      UUID.uuid4()
  end

  def get_db do
    Registry.create(Backend.Database.Registry, "demoapp")
    Registry.lookup(Backend.Database.Registry, "demoapp")
  end
end
