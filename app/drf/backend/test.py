import geocoder

def postal_code_to_lat_lng(postal_code):
    try:
        g = geocoder.yahoo(postal_code)
        if g.ok:
            return g.latlng
        else:
            print('Geocoding failed with status:', g.status)
            return None
    except Exception as e:
        print('Geocoding failed.')
        print(e)
        return None

# Example usage:
postal_code = 'San Francisco, CA'
lat_lng = postal_code_to_lat_lng(postal_code)
if lat_lng is not None:
    latitude, longitude = lat_lng
    print('Latitude:', latitude)
    print('Longitude:', longitude)
