Get-ChildItem "./util/*.js" | Get-Content | Set-Content "./index.js"
Get-ChildItem "./*.js" -exclude "index.js", "tmp.js" | Get-Content | Add-Content "./index.js"
