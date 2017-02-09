defmodule Backend.Database.Registry do
  use GenServer

  ## Client API

  @doc """
  Start the registry
  """
  def start_link(name) do
    GenServer.start_link(__MODULE__, :ok, name: name)
  end

  @doc """
  Stop the registry
  """
  def stop(server) do
    GenServer.stop(server)
  end

  @doc """
  Looks up the bucket pid for `name` stored in `server`.

  Returns `{:ok, pid}` if the bucket exists, `:error` otherwise.
  """
  def lookup(server, name) do
    # call handle_call
    GenServer.call(server, {:lookup, name})
  end

  @doc """
  Ensures there is a bucket associated to the given `name` in `server`.
  """
  def create(server, name) do
    # Call handle_cast
    GenServer.call(server, {:create, name})
  end

  ## Server Callbacks
  def init(:ok) do
    names = %{}
    refs = %{}
    # Return {:ok, state}
    {:ok, {names, refs}}
  end

  # sync
  def handle_call({:lookup, name}, _from, {names, _} = state) do
    {:reply, Map.fetch(names, name), state}
  end

  def handle_call({:create, name}, _from, {names, refs} = state) do
    if Map.has_key?(names, name) do
      {:reply, {names, refs}, state}
    else
      {:ok, pid} = Backend.Database.start_link
      ref = Process.monitor(pid)
      refs = Map.put(refs, ref, name)
      names = Map.put(names, name, pid)
      {:reply, {names, refs}, {names, refs}}
    end
  end

  # async
  def handle_cast({:create, name}, {names, refs}) do
    if Map.has_key?(names, name) do
      {:noreply, {names, refs}}
    else
      {:ok, pid} = Backend.Database.start_link
      ref = Process.monitor(pid)
      refs = Map.put(refs, ref, name)
      names = Map.put(names, name, pid)
      {:noreply, {names, refs}}
    end
  end

  def handle_info({:DOWN, ref, :process, _pid, _reason}, {names, refs}) do
    {name, refs} = Map.pop(refs, ref)
    names = Map.delete(names, name)
    {:noreply, {names, refs}}
  end

  def handle_info(_msg, state) do
    {:noreply, state}
  end
end
