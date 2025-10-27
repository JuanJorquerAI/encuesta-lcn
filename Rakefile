require 'rake'

desc 'Check for duplicate permalinks in _encuestas'
task 'check:permalinks' do
  sh 'ruby scripts/check_permalinks.rb'
end

task default: ['check:permalinks']
