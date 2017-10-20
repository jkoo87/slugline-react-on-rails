class SluglinesController < ApplicationController
  def index
    # Return geojson format db
    @sluglines = Slugline.convert_to_geojason
    @line_list = Slugline.filter_line_list
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
