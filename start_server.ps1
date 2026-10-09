$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:3000/')

try {
    $listener.Start()
    Write-Host 'CampusMate server running on http://localhost:3000'
} catch {
    Write-Host 'Failed to start listener on port 3000'
    exit 1
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $response = $context.Response

        if (Test-Path 'index.html') {
            $htmlBytes = [System.IO.File]::ReadAllBytes('index.html')
            $response.ContentLength64 = $htmlBytes.Length
            $response.ContentType = 'text/html; charset=utf-8'
            $response.StatusCode = 200
            $output = $response.OutputStream
            $output.Write($htmlBytes, 0, $htmlBytes.Length)
            $output.Close()
        } else {
            $response.StatusCode = 404
            $response.Close()
        }
    } catch {
        # ignore context errors
    }
}
