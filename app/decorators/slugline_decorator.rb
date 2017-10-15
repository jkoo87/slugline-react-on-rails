class SluglineDecorator < Draper::Decorator
  delegate_all

  def convert_to_geojason
    arr = []
     # creates factory
    @sluglines.each do | slugline |
      factory = RGeo::GeoJSON::EntityFactory.instance
      line_color = set_line_color(slugline)
       # sets feature variable to feature properties returned from factory
       feature = factory.feature(position,
                               slugline.id, { name: slugline.name,
                                              color: line_color,
                                              is_morning: slugline.is_morning,
                                              note: slugline.note,
                                              line: slugline.line,
                                              location: slugline.location,
                                              description: slugline.description,
                                              best_hours: slugline.best_hours,
                                              good_hours: slugline.good_hours,
                                              destinations: slugline.destinations,
                                              returning_stations: slugline.returning_stations,
                                              driver_note: slugline.driver_note,
                                              parking_tip: slugline.parking_tip})
     # adds returned contents to empty array instantiated line 7
     arr.push(feature)
    end
     # sets new feature collection with array containing feature properties
    feature_collection = RGeo::GeoJSON::FeatureCollection.new(arr)
    respond_to do |format|
      format.html { render action: 'index' }
      # render geojson
      format.geojson { render json: (RGeo::GeoJSON.encode(feature_collection)) }
    end
  end

end
