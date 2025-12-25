export default function NotFound() {
  return (
    <main className="min-h-[50vh] flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="mt-4 inline-flex px-4 py-2 rounded-md bg-black text-white">Go home</a>
      </div>
    </main>
  )
}
