import requests
import os
import time

# Base URL for weapon images
BASE_URL = "https://www.evilresource.com/images/data/full/re8"

# Weapon mapping from weapons.json to Evil Resource filenames
WEAPONS = {
    "lemi.png": f"{BASE_URL}/lemi.png",
    "m1911.png": f"{BASE_URL}/m1911.png",
    "v61.png": f"{BASE_URL}/v61-custom.png",
    "usm-ai.png": f"{BASE_URL}/usm-ai.png",
    "dragoon.png": f"{BASE_URL}/dragoon.png",
    "m1897.png": f"{BASE_URL}/m1897.png",
    "w870-tac.png": f"{BASE_URL}/w870-tac.png",
    "syg-12.png": f"{BASE_URL}/syg-12.png",
    "f2-rifle.png": f"{BASE_URL}/f2-rifle.png",
    "wcx.png": f"{BASE_URL}/wcx.png",
    "wolfsbane.png": f"{BASE_URL}/m1851-wolfsbane.png",
    "stake.png": f"{BASE_URL}/stake.png",
    "gm79.png": f"{BASE_URL}/gm-79.png",
    "rocket-pistol.png": f"{BASE_URL}/rocket-pistol.png",
    "handcannon.png": f"{BASE_URL}/lz-answerer.png",
    "knife.png": f"{BASE_URL}/knife.png",
}

# Output directory
OUTPUT_DIR = r"D:\work-space\self-project\opencode\re8-guide\public\images\weapons"

def download_images():
    """Download all weapon images with proper headers."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Referer': 'https://www.evilresource.com/',
    }
    
    results = {}
    success_count = 0
    failed_count = 0
    
    print("=" * 60)
    print("Downloading Resident Evil Village Weapon Images")
    print("=" * 60)
    
    for local_name, url in WEAPONS.items():
        filepath = os.path.join(OUTPUT_DIR, local_name)
        try:
            print(f"\nDownloading: {local_name}")
            print(f"URL: {url}")
            
            resp = requests.get(url, headers=headers, timeout=30)
            if resp.status_code == 200:
                with open(filepath, 'wb') as f:
                    f.write(resp.content)
                file_size = len(resp.content)
                results[local_name] = file_size
                success_count += 1
                print(f"[OK] Success: {local_name} ({file_size} bytes)")
            else:
                failed_count += 1
                print(f"[FAIL] Failed: {local_name} - Status {resp.status_code}")
        except Exception as e:
            failed_count += 1
            print(f"[ERROR] Error: {local_name} - {e}")
        
        # Be nice to the server
        time.sleep(0.5)
    
    print("\n" + "=" * 60)
    print("Download Summary")
    print("=" * 60)
    print(f"Total weapons: {len(WEAPONS)}")
    print(f"Successful: {success_count}")
    print(f"Failed: {failed_count}")
    print(f"\nImages saved to: {OUTPUT_DIR}")
    
    return results

if __name__ == "__main__":
    download_images()
