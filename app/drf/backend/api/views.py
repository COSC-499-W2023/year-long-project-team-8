import json
from django.http import JsonResponse

# currently set to display sample data and headers
# adjust to set to api home gui
def api_home(request, *args, **kwaargs):
    body = request.body
    data = {}
    try:
        data = json.loads(body)
    except:
        pass
    print(data)
    data['headers'] = dict(request.headers)
    data['content_type'] = request.content_type
    return JsonResponse(data)
