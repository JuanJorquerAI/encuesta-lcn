#!/usr/bin/env ruby
require 'yaml'
require 'pathname'

ROOT = Pathname.new(__dir__).dirname
COLLECTION_DIR = ROOT.join('_encuestas')

unless COLLECTION_DIR.directory?
  STDERR.puts "Collection directory not found: #{COLLECTION_DIR}"
  exit 0
end

permalinks = {}
duplicates = {}

Dir[COLLECTION_DIR.join('*.md')].each do |file|
  content = File.read(file)
  if content =~ /\A---\s*\n(.*?)\n---/m
    front = YAML.load($1) || {}
  else
    front = {}
  end

  # Normalize explicit permalink if present
  if front['permalink'] && !front['permalink'].to_s.empty?
    p = front['permalink'].to_s
    # ensure trailing slash
    p += '/' unless p.end_with?('/')
    effective = p
  else
    # derive title from filename: strip leading date if present
    basename = File.basename(file, File.extname(file))
    title = basename.sub(/^\d{4}-\d{2}-\d{2}-/, '')
    effective = "/encuestas/#{title}/"
  end

  permalinks[effective] ||= []
  permalinks[effective] << file
end

permalinks.each do |perm, files|
  if files.size > 1
    duplicates[perm] = files
  end
end

if duplicates.empty?
  puts "No permalink conflicts found in _encuestas (#{permalinks.size} entries)."
  exit 0
else
  STDERR.puts "Found permalink conflicts:\n"
  duplicates.each do |perm, files|
    STDERR.puts "Permalink: #{perm} is used by:" 
    files.each { |f| STDERR.puts "  - #{f}" }
    STDERR.puts ""
  end
  STDERR.puts "Fix by ensuring unique 'permalink' front matter or unique filenames."
  exit 2
end
