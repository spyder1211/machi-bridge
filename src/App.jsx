import { municipalities, services, budgetSections, categories } from './data'

console.log(`データ読み込み完了: 自治体=${municipalities.length}, サービス=${services.length}, 予算款=${budgetSections.length}, カテゴリ=${categories.length}`)

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <h1 className="text-2xl font-bold p-8">まちブリッジ</h1>
    </div>
  )
}
export default App
