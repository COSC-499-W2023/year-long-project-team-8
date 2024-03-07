import re
import socket
    
def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        local_ip = s.getsockname()[0]
    finally:
        s.close()
    return local_ip

def update_config_file(file_path, new_ip):
    with open(file_path, 'r') as file:
        config_content = file.read()

    # Replace the old IP address with the new one
    updated_config_content = re.sub(r'(baseEndpoint\s*=\s*["\'])([^"\']+)(["\'])', rf'\g<1>http://{new_ip}:8000/api\g<3>', config_content)    
    with open(file_path, 'w') as file:
        file.write(updated_config_content)

config_file_path = 'config.js'

new_ip_address = get_local_ip()

update_config_file(config_file_path, new_ip_address)

print(f'Config file "{config_file_path}" updated with the new IP address: {new_ip_address}')
