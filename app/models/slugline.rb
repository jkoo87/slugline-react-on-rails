class Slugline < ApplicationRecord
  # Convert database to geojson format
  def self.convert_to_geojason
    arr = []
     # creates factory
    factory = RGeo::GeoJSON::EntityFactory.instance
    # https://stackoverflow.com/questions/36775869/rgeo-error-attempting-to-create-point-from-lat-lon
    pointFactory = RGeo::Geographic.spherical_factory(srid: 4326)
    all.each do | slugline |
      # Set geometry coordinates point
      position = pointFactory.point(slugline.longitude, slugline.latitude)
      # Set line color
      line_color = SluglinesController.helpers.set_line_color(slugline)
      slugline_attributes = slugline.attributes
      slugline_attributes[:color] = line_color
      # sets feature variable to feature properties returned from factory
      feature = factory.feature(position,
                                slugline.id,
                                slugline_attributes)
     # adds returned contents to empty array instantiated line 7
     arr.push(feature)
    end
    # sets new feature collection with array containing feature properties
    feature_collection = RGeo::GeoJSON::FeatureCollection.new(arr)
    return RGeo::GeoJSON.encode(feature_collection)
  end

  def self.filter_line_list
    {
      morning: where(is_morning: true).map(&:line).uniq,
      afternoon: where(is_morning: false).map(&:line).uniq
    }
  end
end
