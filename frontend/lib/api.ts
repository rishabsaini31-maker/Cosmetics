export async function fetchHomepageContent() {
  const res = await fetch("http://localhost:3000/homepage");
  if (!res.ok) throw new Error("Failed to fetch homepage content");
  return res.json();
}

export async function updateHomepageContent(data: any) {
  const res = await fetch("http://localhost:3000/homepage", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update homepage content");
  return res.json();
}
