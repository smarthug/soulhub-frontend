import React from 'react'
import { useParams } from 'react-router-dom'
import { SafetySeal } from '@/components/ai/SafetySeal'
import { IngredientTable } from '@/components/ai/IngredientTable'
import { CommitTimeline } from '@/components/ai/CommitTimeline'
import { Button } from '@/components/common/Button'

export default function Character(){
  const { id } = useParams()
  // Harmfulness categories

    // Harmfulness categories
    const harmfulness = [
      { key: 'Horror', color: 'bg-purple-200' },
      { key: 'Violence', color: 'bg-red-200' },
      { key: 'Sexuality', color: 'bg-pink-200' },
      { key: 'Inappropriate Language', color: 'bg-yellow-200' },
      { key: 'Drugs', color: 'bg-green-200' },
      { key: 'Crime', color: 'bg-gray-200' },
      { key: 'Gambling', color: 'bg-blue-200' },
    ];

    // Example commit data with age rating and harmfulness
    const commits = [
      {
        id: 'a1b2c3d',
        message: 'Initial character json',
        when: '2025-08-14',
        safety: 'B' as 'A'|'B'|'C'|'D',
        age: '12+',
        ingredients: [
          {type:'dataset' as 'dataset', source:'OpenDialog v1', license:'CC-BY-4.0'},
          {type:'model' as 'model', source:'LLM-X 8B', license:'Apache-2.0'},
          {type:'prompt' as 'prompt', source:'system: role-playing guide'}
        ],
        harmful: ['Violence', 'Inappropriate Language']
      },
      {
        id: 'e4f5g6h',
        message: 'Add safety tags',
        when: '2025-08-15',
        safety: 'A' as 'A'|'B'|'C'|'D',
        age: 'All',
        ingredients: [
          {type:'dataset' as 'dataset', source:'OpenDialog v2', license:'CC-BY-4.0'},
          {type:'model' as 'model', source:'LLM-X 8B', license:'Apache-2.0'},
          {type:'prompt' as 'prompt', source:'system: role-playing guide'}
        ],
        harmful: []
      }
    ];

    /**
     * Returns ingredients in current that are not in prev
     * @param {Array} current
     * @param {Array} prev
     */
    const diffIngredients = (current: any[], prev: any[]) => {
      const serialize = (ing: any) => `${ing.type}|${ing.source}|${ing.license ?? ''}`;
      const prevSet = new Set(prev.map(serialize));
      return current.filter((ing: any) => !prevSet.has(serialize(ing)));
    };

    // Tab state
    const [tab, setTab] = React.useState('git');

    // Example data for other tabs
    const persona = 'Friendly mentor, guides users with empathy and expertise.';
    const prompt = 'You are a helpful AI character. Always provide clear, safe, and supportive answers.';

    return (
      <section className="max-w-5xl mx-auto space-y-8">
        {/* Tab Navigation */}
        <div className="border-b mb-6">
          <nav className="flex gap-2">
            <button
              className={`px-4 py-2 font-medium rounded-t-md ${tab==='git' ? 'bg-white border-x border-t border-b-0' : 'bg-slate-100'}`}
              onClick={()=>setTab('git')}
            >Git Graph</button>
            <button
              className={`px-4 py-2 font-medium rounded-t-md ${tab==='ingredients' ? 'bg-white border-x border-t border-b-0' : 'bg-slate-100'}`}
              onClick={()=>setTab('ingredients')}
            >Ingredients</button>
            <button
              className={`px-4 py-2 font-medium rounded-t-md ${tab==='prompt' ? 'bg-white border-x border-t border-b-0' : 'bg-slate-100'}`}
              onClick={()=>setTab('prompt')}
            >Prompting</button>
            <button
              className={`px-4 py-2 font-medium rounded-t-md ${tab==='personality' ? 'bg-white border-x border-t border-b-0' : 'bg-slate-100'}`}
              onClick={()=>setTab('personality')}
            >Personality</button>
            <button
              className={`px-4 py-2 font-medium rounded-t-md ${tab==='harm' ? 'bg-white border-x border-t border-b-0' : 'bg-slate-100'}`}
              onClick={()=>setTab('harm')}
            >Harmfulness Levels</button>
          </nav>
        </div>

        {/* Character Header */}
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{id}</h1>
            <p className="text-slate-600 mt-1">Description text — character's purpose/personality/guide</p>
            <div className="mt-3"><SafetySeal level="B" tags={['language','violence']} /></div>
          </div>
          <div className="flex gap-2">
            <Button>Fork</Button>
            <Button variant="ghost">Run API Demo</Button>
          </div>
        </header>

        {/* Tab Content */}
        {tab === 'git' && (
          <section>
            <h2 className="font-semibold mb-4">Commit History</h2>
            <div className="space-y-6">
              {commits.map((commit, idx) => {
                const prevIngredients = idx > 0 ? commits[idx-1].ingredients : [];
                const diff = diffIngredients(commit.ingredients, prevIngredients);
                return (
                  <div key={commit.id} className="border rounded-2xl p-4 bg-white shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <SafetySeal level={commit.safety} tags={commit.harmful} />
                        <span className="text-xs px-2 py-1 rounded bg-slate-100">Age: {commit.age}</span>
                      </div>
                      <div className="text-xs text-slate-500">{commit.when}</div>
                    </div>
                    <div className="font-semibold mb-1">{commit.message}</div>
                    <div className="mb-2">
                      <span className="font-medium text-sm">Ingredients Changed:</span>
                      {diff.length > 0 ? (
                        <IngredientTable rows={diff} />
                      ) : (
                        <div className="text-xs text-slate-400 mt-1">No ingredient changes</div>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="font-medium text-sm">Harmfulness Levels:</span>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {harmfulness.map(h => (
                          <span
                            key={h.key}
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${h.color} ${commit.harmful.includes(h.key) ? 'opacity-100' : 'opacity-40'}`}
                          >
                            {h.key}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">* Intuitive marks, like game certification badges</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {tab === 'ingredients' && (
          <section>
            <h2 className="font-semibold mb-4">Ingredients</h2>
            <IngredientTable rows={commits[commits.length-1].ingredients} />
          </section>
        )}

        {tab === 'prompt' && (
          <section>
            <h2 className="font-semibold mb-4">Prompting</h2>
            <div className="border rounded-2xl p-4 bg-white text-slate-700 text-sm">
              {prompt}
            </div>
          </section>
        )}

        {tab === 'personality' && (
          <section>
            <h2 className="font-semibold mb-4">Personality</h2>
            <div className="border rounded-2xl p-4 bg-white text-slate-700 text-sm">
              {persona}
            </div>
          </section>
        )}

        {tab === 'harm' && (
          <section>
            <h2 className="font-semibold mb-4">Harmfulness Levels</h2>
            <div className="border rounded-2xl p-4 bg-white">
              <div className="flex gap-2 flex-wrap">
                {harmfulness.map(h => (
                  <span
                    key={h.key}
                    className={`inline-flex items-center px-3 py-2 rounded text-sm font-medium ${h.color}`}
                  >
                    {h.key}
                  </span>
                ))}
              </div>
              <div className="text-xs text-slate-400 mt-2">* These levels are used for intuitive safety marking.</div>
            </div>
          </section>
        )}
      </section>
    );
}
