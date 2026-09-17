import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api/url'
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

function getShortUrl(code) {
  return `${SERVER_URL}/${code}`
}

function App() {
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])
  const [latest, setLatest] = useState(null)
  const [loading, setLoading] = useState(false)
  const [listLoading, setListLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  const fetchLinks = async () => {
    setListLoading(true)
    try {
      const response = await api.get('/')
      setLinks(response.data?.data?.urls || [])
      setError('')
    } catch {
      setError('Could not load links. Make sure the backend is running on port 3000.')
    } finally {
      setListLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const shortenUrl = async (event) => {
    event.preventDefault()
    if (!url.trim()) {
      setError('Please enter a URL to shorten.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await api.post('/', { url: url.trim() })
      const data = response.data?.data
      if (data?.shortCode) {
        setLatest({
          originalUrl: data.originalUrl,
          shortCode: data.shortCode,
          shortUrl: getShortUrl(data.shortCode),
        })
      }
      setUrl('')
      await fetchLinks()
    } catch (requestError) {
      setError(requestError.response?.data?.error || 'Unable to shorten this URL.')
    } finally {
      setLoading(false)
    }
  }

  const copyLink = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      window.setTimeout(() => setCopied(''), 1200)
    } catch {
      setError('Copy failed. Please copy the link manually.')
    }
  }

  const deleteLink = async (id) => {
    try {
      await api.delete(`/${id}`)
      if (latest && links.find((link) => link._id === id)?.shortCode === latest.shortCode) {
        setLatest(null)
      }
      await fetchLinks()
    } catch {
      setError('Unable to delete this link.')
    }
  }

  return (
    <main className="min-h-screen bg-[#e9e4dc] px-4 py-7 text-[#201d1b] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 border-b border-black/20 pb-5">
          <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
            <span className="rounded-lg bg-[#1d1d1d] px-3 py-2 text-sm font-bold tracking-wide text-white">URL</span>
            <h1 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">The screen</h1>
            <p className="pb-1 text-sm text-black/65 sm:text-base">One page, four parts, top to bottom</p>
          </div>
        </header>

        <section className="space-y-5">
          <div className="flex gap-4">
            <span className="step-number">1</span>
            <div>
              <h2 className="text-3xl font-black tracking-[-0.07em] sm:text-4xl">Long links?</h2>
              <p className="mt-1 text-sm text-black/75 sm:text-base">Paste a link, get a short one, see how many people clicked it.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="step-number">2</span>
            <form className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row" onSubmit={shortenUrl}>
              <input
                className="min-w-0 flex-1 rounded-lg border border-black/35 bg-white/25 px-4 py-3 outline-none placeholder:text-black/55 focus:border-black"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="Paste a long URL here..."
                type="url"
              />
              <button className="rounded-lg bg-[#1d1d1d] px-7 py-3 font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>
                {loading ? 'Shortening...' : 'Shorten'}
              </button>
            </form>
          </div>

          {error && <p className="ml-12 rounded-lg border border-red-800/30 bg-red-100/50 px-4 py-2 text-sm text-red-900">{error}</p>}

          {latest && (
            <div className="flex gap-4">
              <span className="step-number">3</span>
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-black/30 bg-white/20 px-3 py-2">
                <a className="min-w-0 flex-1 truncate font-medium text-[#9a3f32] hover:underline" href={latest.shortUrl} target="_blank" rel="noreferrer">{latest.shortUrl}</a>
                <button className="rounded-md border border-black/30 bg-[#f4f0e9] px-3 py-1.5 text-sm" onClick={() => copyLink(latest.shortUrl)}>{copied === latest.shortUrl ? 'Copied' : 'Copy'}</button>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <span className="step-number">3</span>
            <div className="min-w-0 flex-1">
              <h2 className="mb-3 text-xl font-bold">Your links ({links.length})</h2>
              <div className="overflow-hidden rounded-lg border border-black/25 bg-white/10">
                {listLoading ? (
                  <p className="px-4 py-5 text-sm text-black/60">Loading links...</p>
                ) : links.length === 0 ? (
                  <p className="px-4 py-5 text-sm text-black/60">No links yet. Shorten your first URL above.</p>
                ) : links.map((link) => {
                  const shortUrl = getShortUrl(link.shortCode)
                  return (
                    <div className="grid gap-2 border-b border-black/15 px-4 py-3 last:border-0 sm:grid-cols-[90px_minmax(0,1fr)_90px_auto_auto] sm:items-center sm:gap-4" key={link._id}>
                      <a className="font-bold text-[#9a3f32] hover:underline" href={shortUrl} target="_blank" rel="noreferrer">{link.shortCode}</a>
                      <span className="truncate text-sm">{link.originalUrl}</span>
                      <span className="text-sm text-black/65">{link.clicks || 0} clicks</span>
                      <button className="rounded-md border border-black/30 bg-[#f4f0e9] px-3 py-1.5 text-sm" onClick={() => copyLink(shortUrl)}>{copied === shortUrl ? 'Copied' : 'Copy'}</button>
                      <button className="rounded-md border border-black/30 px-3 py-1.5 text-sm hover:bg-black/5" onClick={() => deleteLink(link._id)}>Delete</button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 overflow-x-auto border-t border-black/20 pt-3">
          <table className="w-full min-w[680px] border-collapse text-left text-sm">
            <thead className="bg-[#ddd8d0] text-xs uppercase tracking-wider text-black/65">
              <tr><th className="border border-black/15 px-3 py-2">Part</th><th className="border border-black/15 px-3 py-2">Component</th><th className="border border-black/15 px-3 py-2">What it does</th></tr>
            </thead>
            <tbody>
              <tr><td className="border border-black/15 px-3 py-2">1</td><td className="border border-black/15 px-3 py-2">Hero in App.jsx</td><td className="border border-black/15 px-3 py-2">Heading and one-line subtitle</td></tr>
              <tr><td className="border border-black/15 px-3 py-2">2</td><td className="border border-black/15 px-3 py-2">Shorten form</td><td className="border border-black/15 px-3 py-2">Posts the URL and shows validation or backend errors</td></tr>
              <tr><td className="border border-black/15 px-3 py-2">3</td><td className="border border-black/15 px-3 py-2">Result card</td><td className="border border-black/15 px-3 py-2">Shows the new link with a copy action</td></tr>
              <tr><td className="border border-black/15 px-3 py-2">4</td><td className="border border-black/15 px-3 py-2">URL list</td><td className="border border-black/15 px-3 py-2">Loads, copies, and deletes saved links</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  )
}

export default App
