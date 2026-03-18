import { TypingTest } from "./components/TypingTest"

function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
            <div className="max-w-3xl w-full">
                <h1 className="text-4xl font-bold mb-8 text-center">Type Sprint</h1>
                <TypingTest />
            </div>
        </div>
    )
}

export default App