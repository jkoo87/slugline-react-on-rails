# class SluglineDecorator < Draper::Decorator
#   include Draper::LazyHelpers
#   delegate_all
#
#   def convert_to_geojason
#     arr = []
#      # creates factory
#     factory = RGeo::GeoJSON::EntityFactory.instance
#     # https://stackoverflow.com/questions/36775869/rgeo-error-attempting-to-create-point-from-lat-lon
#     pointFactory = RGeo::Geographic.spherical_factory(srid: 4326)
#     @sluglines.each do | slugline |
#       # Set geometry coordinates point
#       position = pointFactory.point(slugline.longitude, slugline.latitude)
#       # Set line color
#       line_color = set_line_color(slugline)
#       # sets feature variable to feature properties returned from factory
#       feature = factory.feature(position,
#                                 slugline.id,
#                                 slugline.attributes)
#      # adds returned contents to empty array instantiated line 7
#      arr.push(feature)
#     end
#      # sets new feature collection with array containing feature properties
#     feature_collection = RGeo::GeoJSON::FeatureCollection.new(arr)
#     return RGeo::GeoJSON.encode(feature_collection)
#   end
#
#   def filter_line_list
#     list = {}
#     line = []
#     @lineList.where(is_morning: true).each do |slugline|
#       line = line.push(slugline.line)
#     end
#     list[:morning] = line.uniq
#    
#
#   end
#
# end
