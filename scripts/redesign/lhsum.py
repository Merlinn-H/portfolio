import json,sys
for f in sys.argv[1:]:
  d=json.load(open(f)); c=d['categories']; a=d['audits']
  tot=sum(i.get('transferSize',0) for i in a['network-requests']['details']['items'] if i.get('resourceType')=='Script')
  print(f.split('/')[-1], {k:round(v['score']*100) if v['score'] is not None else None for k,v in c.items()},
   'LCP',a['largest-contentful-paint']['displayValue'],'CLS',a['cumulative-layout-shift']['displayValue'],'TBT',a['total-blocking-time']['displayValue'], 'JS kB', round(tot/1024,1))
