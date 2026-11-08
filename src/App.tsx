import { useEffect, useState } from 'react'
import api from './lib/api'

interface HealthResponse {
  status: string
  message: string
  application: string
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get<HealthResponse>('/health')

        setHealth(response.data)
      } catch {
        setError('Unable to connect to the CurveBiz backend.')
      } finally {
        setLoading(false)
      }
    }

    checkBackend()
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-3xl font-bold">CurveBiz</h1>

        <p className="mt-2 text-slate-400">
          Business management, organised.
        </p>

        <div className="mt-8 rounded-xl bg-slate-800 p-5">
          <h2 className="font-semibold">Backend connection</h2>

          {loading && (
            <p className="mt-3 text-slate-400">
              Connecting to Laravel...
            </p>
          )}

          {error && (
            <p className="mt-3 text-red-400">{error}</p>
          )}

          {health && (
            <div className="mt-4">
              <p className="text-emerald-400 font-medium">
                ✓ {health.message}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Application: {health.application}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Status: {health.status}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default App