export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-semibold">JP-FlashCard</h1>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer>
        <div className="bg-gray-200">
          <div className="container mx-auto p-4">
            <div className="flex justify-evenly">
              <div className="flex flex-col items-center">
                <h4 className="font-semibold text-lg opacity-75">Link Section #1</h4>
                <ul>
                  <li className="hover:underline">
                    <a href="#">Link 1</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Link 2</a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <h4 className="font-semibold text-lg opacity-75">Link Section #2</h4>
                <ul>
                  <li className="hover:underline">
                    <a href="#">Link 1</a>
                  </li>
                  <li className="hover:underline">
                    <a href="#">Link 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-gray-400">
            <div className="container text-center">&copy; {new Date().getFullYear()} JP-FlashCard</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
