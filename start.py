"""Run Barista Buddy locally using only Python's standard library."""
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import argparse
import webbrowser

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Start your local Barista Buddy notebook.')
    parser.add_argument('--port', type=int, default=8765)
    parser.add_argument('--no-browser', action='store_true')
    args = parser.parse_args()
    directory = Path(__file__).resolve().parent / 'dist'
    handler = partial(SimpleHTTPRequestHandler, directory=str(directory))
    try:
        server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
    except OSError as error:
        raise SystemExit(f'Could not start the notebook: {error}. Try --port 8766.')
    address = f'http://localhost:{args.port}/'
    print(f'Barista Buddy is ready at {address}\nKeep this window open. Press Ctrl+C to stop.')
    if not args.no_browser:
        webbrowser.open(address)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
