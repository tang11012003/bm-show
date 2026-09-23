#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
原型说明跨页面同步与复制工具 (Sync Prototype Docs CLI)
用于在项目内快速将某个 HTML 页面的【原型说明】同步写回到其他所有或指定 HTML 文件中。

使用示例：
  1. 查看所有页面的原型说明状态：
     python sync_proto_docs.py --list

  2. 将 fenxi.html 的原型说明同步给全部页面：
     python sync_proto_docs.py --from fenxi.html --to all

  3. 将 fenxi.html 的说明同步给指定页面：
     python sync_proto_docs.py --from fenxi.html --to cuoti.html shequ.html
"""

import sys
import os
import glob
import re
import json
import argparse

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_proto_files():
    files = sorted(glob.glob(os.path.join(WORKSPACE_DIR, '*.html')))
    proto_files = []
    for f in files:
        fname = os.path.basename(f)
        if fname in ['index.html', 'chanpin_wendang.html', 'prd-recover.html']:
            continue
        try:
            with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
                c = fp.read()
            if 'prototypeAnnotationData' in c:
                proto_files.append(f)
        except Exception:
            pass
    return proto_files

def extract_docs_data(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    m = re.search(r'<script id="prototypeAnnotationData"[^>]*>([\s\S]*?)</script>', c)
    if not m:
        return None, None
    try:
        data = json.loads(m.group(1))
        return data.get('globalSections', []), data.get('globalMeta', {})
    except Exception as e:
        print(f"[Error] 解析 {os.path.basename(filepath)} JSON 失败: {e}")
        return None, None

def write_docs_to_file(filepath, sections, meta=None):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    m = re.search(r'(<script id="prototypeAnnotationData"[^>]*>)([\s\S]*?)(</script>)', content)
    if not m:
        return False
    
    prefix = m.group(1)
    raw_json = m.group(2)
    suffix = m.group(3)
    
    try:
        data = json.loads(raw_json)
        data['globalSections'] = sections
        if meta and 'name' in meta:
            if 'globalMeta' not in data:
                data['globalMeta'] = {}
            data['globalMeta']['name'] = meta.get('name', '原型说明')
            data['globalMeta']['updatedAt'] = meta.get('updatedAt', '')
        
        new_json = json.dumps(data, ensure_ascii=False, indent=2)
        new_block = f"{prefix}\n{new_json}\n{suffix}"
        new_content = content[:m.start()] + new_block + content[m.end():]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    except Exception as e:
        print(f"[Error] 写入 {os.path.basename(filepath)} 失败: {e}")
        return False

def list_pages():
    files = get_proto_files()
    print(f"\n================ 项目内原型页面说明概况 (共 {len(files)} 个页面) ================")
    print(f"{'文件名':24s} | {'页面标题':15s} | 章节数量与标题")
    print("-" * 75)
    for f in files:
        fname = os.path.basename(f)
        with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
            c = fp.read()
        m_title = re.search(r'<title>([^<]+)</title>', c)
        title = m_title.group(1).strip() if m_title else fname
        title = re.sub(r'\s*[-·|].*$', '', title).strip()
        
        sections, _ = extract_docs_data(f)
        if sections is None:
            sec_info = "❌ 数据未找到"
        elif len(sections) == 0:
            sec_info = "0 节 (空)"
        else:
            first_title = sections[0].get('title', '未命名')
            is_placeholder = ('在此处填写' in sections[0].get('content', ''))
            tag = " [占位符]" if is_placeholder else " [定制内容]"
            sec_info = f"{len(sections)} 节: {first_title}{tag}"
        
        print(f"{fname:24s} | {title:15s} | {sec_info}")
    print("=" * 75 + "\n")

def sync_docs(from_page, to_targets):
    from_path = os.path.join(WORKSPACE_DIR, from_page) if not os.path.isabs(from_page) else from_page
    if not os.path.exists(from_path):
        print(f"[Error] 来源文件不存在: {from_page}")
        return
    
    sections, meta = extract_docs_data(from_path)
    if sections is None:
        print(f"[Error] 无法从 {from_page} 读取原型说明数据。")
        return
    
    all_files = get_proto_files()
    if len(to_targets) == 1 and to_targets[0].lower() == 'all':
        target_files = [f for f in all_files if os.path.basename(f) != os.path.basename(from_path)]
    else:
        target_files = []
        for t in to_targets:
            p = os.path.join(WORKSPACE_DIR, t) if not os.path.isabs(t) else t
            if os.path.exists(p):
                target_files.append(p)
            else:
                print(f"[Warning] 目标文件未找到，已跳过: {t}")

    print(f"\n🚀 开始从 【{os.path.basename(from_path)}】 同步原型说明到 {len(target_files)} 个页面...")
    print(f"📖 同步的章节数: {len(sections)} 节")
    for i, s in enumerate(sections):
        print(f"   - 第 {i+1} 节: {s.get('title', '')}")
    
    success_count = 0
    for target in target_files:
        tname = os.path.basename(target)
        if write_docs_to_file(target, sections, meta):
            success_count += 1
            print(f"  [OK] 已更新 {tname}")
        else:
            print(f"  [FAIL] 更新失败: {tname}")
    
    print(f"\n🎉 同步完成！成功更新 {success_count}/{len(target_files)} 个文件。")
    print("提示：浏览器中刷新对应页面即可看到最新保持一致的原型说明。\n")

def main():
    parser = argparse.ArgumentParser(description="原型说明跨页面批量同步工具")
    parser.add_argument('--list', action='store_true', help="列出所有页面的原型说明状态")
    parser.add_argument('--from', dest='from_page', help="来源 HTML 页面文件名 (如: fenxi.html)")
    parser.add_argument('--to', nargs='+', help="目标页面文件名或 'all' (如: --to all 或 --to cuoti.html shequ.html)")
    
    args = parser.parse_args()
    
    if args.list or (not args.from_page and not args.to):
        list_pages()
    elif args.from_page and args.to:
        sync_docs(args.from_page, args.to)
    else:
        print("[Error] 请同时指定 --from 和 --to 参数。例如:")
        print("  python sync_proto_docs.py --from fenxi.html --to all")

if __name__ == '__main__':
    main()
