defmodule Backend.DocumentView do
  use Backend.Web, :view

  def render("index.json", %{documents: documents}) do
    %{documents: render_many(documents, Backend.DocumentView, "document.json")}
  end

  def render("show.json", %{document: document}) do
    %{documents: render_one(document, Backend.DocumentView, "document.json")}
  end

  def render("document.json", %{document: document}) do
    %{
      id: document.id,
      title: document.title
    }
  end
end
