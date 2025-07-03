// src/components/PlanGenerator.jsx
import React, { useState } from 'react'
import { generateWorkoutPlan } from '../api/openai'

export default function PlanGenerator({ entries }) {
  const [goals, setGoals] = useState('')
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    if (!goals.trim()) return

    setLoading(true)
    setError(null)
    try {
      const result = await generateWorkoutPlan({
        goals,
        history: entries
      })
      setPlan(result)
    } catch (err) {
      console.error(err)
      setError('Something went wrong, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto my-8 p-4 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">AI-Powered Workout Plan</h2>

      <textarea
        className="w-full p-2 border rounded mb-3"
        rows={3}
        placeholder="Enter your fitness goals (e.g. gain muscle, improve 5K time)"
        value={goals}
        onChange={e => setGoals(e.target.value)}
      />

      <button
        className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading || !goals.trim()}
      >
        {loading ? 'Generating…' : 'Generate Plan'}
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      {plan && (
        <pre className="bg-gray-100 p-4 mt-4 rounded overflow-auto whitespace-pre-wrap">
          {typeof plan === 'string' ? plan : JSON.stringify(plan, null, 2)}
        </pre>
      )}
    </div>
  )
}