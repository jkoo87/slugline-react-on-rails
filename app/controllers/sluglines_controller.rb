class SluglinesController < ApplicationController
  include SluglinesHelper
  def index
    slugline = Slugline.new
    # Return geojson format db
    @sluglines = slugline.convert_to_geojason(Slugline.all)
    respond_to do |format|
      format.html { render action: 'index' }
      # render geojson
      format.geojson { render json: @sluglines }
    end
  end

  def show
    @slugline = Slugline.find(params[:id])
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @slugline }
    end
  end

end
