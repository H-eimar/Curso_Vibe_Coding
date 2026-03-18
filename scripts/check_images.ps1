
# Lista de todas las URLs únicas usadas en las propiedades
$urls = @(
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
  "https://images.unsplash.com/photo-1556912173-3bb406ef7e8b?w=800&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
  "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&q=80",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
  "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  "https://images.unsplash.com/photo-1560185008-b4163e6b0f05?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200&q=80",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
  "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&q=80",
  "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80",
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
  "https://images.unsplash.com/photo-1592247350271-c5efb34df967?w=800&q=80",
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80",
  "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
  "https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=800&q=80",
  "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?w=800&q=80",
  "https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=1200&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=80",
  "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&q=80",
  "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80",
  "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
  "https://images.unsplash.com/photo-1600566752734-2a0cdebb4b27?w=800&q=80",
  "https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?w=800&q=80",
  "https://images.unsplash.com/photo-1566908829550-e6551b00979b?w=800&q=80",
  "https://images.unsplash.com/photo-1598714805247-5dd7b9de5a36?w=800&q=80",
  "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&q=80",
  "https://images.unsplash.com/photo-1596204976717-1a9ff47f74ef?w=800&q=80",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80",
  "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=80",
  "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80",
  "https://images.unsplash.com/photo-1420774981456-791dd32be651?w=800&q=80",
  "https://images.unsplash.com/photo-1571768078721-b847539fd614?w=800&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687644-c7171b41f9b4?w=1200&q=80",
  "https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=800&q=80",
  "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=800&q=80",
  "https://images.unsplash.com/photo-1589834390005-5d4d9a3d1ece?w=800&q=80",
  "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&q=80",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
  "https://images.unsplash.com/photo-1600210491892-03d54730d9e9?w=800&q=80",
  "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=800&q=80",
  "https://images.unsplash.com/photo-1617104678098-de229db51175?w=800&q=80",
  "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  "https://images.unsplash.com/photo-1614596247587-5c9d0e1c5b11?w=1200&q=80",
  "https://images.unsplash.com/photo-1623298317883-6b70254edf31?w=800&q=80",
  "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
  "https://images.unsplash.com/photo-1612637968894-660373e23b03?w=800&q=80",
  "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1200&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
  "https://images.unsplash.com/photo-1592247350271-c5efb34df967?w=1200&q=80",
  "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80",
  "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
  "https://images.unsplash.com/photo-1566908829550-e6551b00979b?w=1200&q=80",
  "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=1200&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80",
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80",
  "https://images.unsplash.com/photo-1614596247587-5c9d0e1c5b11?w=800&q=80",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80",
  "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=1200&q=80"
)

$broken = @()
$ok = @()

Write-Host "Verificando $($urls.Count) URLs..." -ForegroundColor Cyan

foreach ($url in ($urls | Select-Object -Unique)) {
  try {
    $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -ErrorAction Stop -UseBasicParsing
    if ($response.StatusCode -eq 200) {
      $ok += $url
    } else {
      $broken += $url
      Write-Host "ROTA ($($response.StatusCode)): $url" -ForegroundColor Red
    }
  } catch {
    $statusCode = "ERR"
    try { $statusCode = $_.Exception.Response.StatusCode.value__ } catch {}
    $broken += $url
    Write-Host "ROTA ($statusCode): $url" -ForegroundColor Red
  }
}

Write-Host "`n=== RESUMEN ===" -ForegroundColor Yellow
Write-Host "OK: $($ok.Count)" -ForegroundColor Green  
Write-Host "ROTAS: $($broken.Count)" -ForegroundColor Red

if ($broken.Count -gt 0) {
  Write-Host "`nURLs ROTAS:" -ForegroundColor Red
  $broken | ForEach-Object { Write-Host "  $_" }
}
