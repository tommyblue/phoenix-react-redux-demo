defmodule Backend.DocumentController do
  use Backend.Web, :controller
  require Logger
  alias Backend.Database.Client, as: DbClient

  def index(conn, _params) do
    {:ok, documents} = DbClient.get_all
    :timer.sleep(1000)
    render conn, "index.json", documents: documents
  end

  def show(conn, %{"id" => id}) do
    document = DbClient.get(id)
    render conn, "show.json", document: document
  end

  def create(conn, %{"document" => doc_params}) do
    document = DbClient.new(doc_params)
    render conn, "show.json", document: document
  end

  def update(conn, %{"id" => id, "document" => doc_params}) do
    document = DbClient.update(id, doc_params)
    render conn, "show.json", document: document
  end

  def delete(conn, %{"id" => id}) do
    DbClient.delete(id)
    conn
    |> put_resp_content_type("text/plain")
    |> send_resp(200, "")
  end
end
