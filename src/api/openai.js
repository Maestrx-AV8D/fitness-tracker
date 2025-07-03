import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
})

export async function generateWorkoutPlan({ goals, history }) {
  const prompt = `
    You are a fitness coach. Given these past sessions:
    ${history.map(e=>`${e.date} – ${e.type}: ${e.details}`).join('\n')}
    and these goals: ${goals}
    Produce a 1-week workout plan.
  `
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  })
  return res.choices[0].message.content
}