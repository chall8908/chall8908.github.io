#-*- ruby -*-

task :make_post, [:name] do |t, args|
  name = args.name
  now = Time.now
  root = File.expand_path(File.dirname(__FILE__))

  # remove non-word characters
  file_name = name.downcase.gsub(/[^\w ]/, '').gsub(/\b\w{,3}\b/, '').gsub(/\s+/, '-')

  File.open(File.join(root, '_posts', "#{now.strftime('%Y-%m-%d')}-#{file_name}.md"), 'w') do |f|
    f.write <<-FRONT
---
layout: post
author: Chris Hall
title: #{name}
---
FRONT
  end
end
