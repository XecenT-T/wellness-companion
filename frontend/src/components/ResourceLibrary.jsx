import React, { useState, useEffect } from "react"
import { SAMPLE_RESOURCES } from "../sampleResources"
import ResourceCard from "./ResourceCard"

export default function ResourceLibrary() {
  const [resources, setResources] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("resources")) || SAMPLE_RESOURCES
      )
    } catch (e) {
      return SAMPLE_RESOURCES
    }
  })

  const [q, setQ] = useState("")
  const [filter, setFilter] = useState("all")
  const [downloads, setDownloads] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("downloads")) || []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("resources", JSON.stringify(resources))
  }, [resources])

  useEffect(() => {
    localStorage.setItem("downloads", JSON.stringify(downloads))
  }, [downloads])

  function onDownload(res) {
    if (!downloads.find((d) => d.id === res.id)) {
      const updated = [...downloads, res]
      setDownloads(updated)
      alert("Saved for offline access")
    } else {
      alert("Already saved")
    }
  }

  const filtered = resources.filter((r) => {
    if (filter !== "all" && r.category !== filter) return false
    if (
      q &&
      !`${r.title} ${r.description} ${r.category}`
        .toLowerCase()
        .includes(q.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search resources..."
          className="flex-1 p-2 rounded border"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="all">All</option>
          <option value="anxiety">Anxiety</option>
          <option value="depression">Depression</option>
          <option value="stress">Stress</option>
          <option value="relationships">Relationships</option>
        </select>
      </div>

      {filtered.length > 0 ? (
        filtered.map((r) => (
          <ResourceCard key={r.id} res={r} onDownload={onDownload} />
        ))
      ) : (
        <div className="text-gray-600">No resources found.</div>
      )}
    </div>
  )
}