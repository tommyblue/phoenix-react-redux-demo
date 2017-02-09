defmodule Backend.Database.RegistryTest do
  use ExUnit.Case, async: true
  alias Backend.Database.Registry, as: Registry

  setup context do
    {:ok, registry} = Registry.start_link(context.test)
    {:ok, registry: registry}
  end

  test "can spawn databases", %{registry: registry} do
    assert Registry.lookup(registry, "test") == :error

    Registry.create(registry, "test")
    assert {:ok, database} = Registry.lookup(registry, "test")

    Backend.Database.put(database, "key", 1)
    assert Backend.Database.get(database, "key") == 1
  end

  test "remove the databases on exit", %{registry: registry} do
    Registry.create(registry, "test2")
    {:ok, db} = Registry.lookup(registry, "test2")
    Registry.stop(db)
    assert Registry.lookup(registry, "test2") == :error
  end
end
