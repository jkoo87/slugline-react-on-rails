json = ActiveSupport::JSON.decode(File.read('db/seeds/sluglines.json'))

json.each do |a|
  Slugline.create!(a)
end
