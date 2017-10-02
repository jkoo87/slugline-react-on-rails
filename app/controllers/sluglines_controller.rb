class SluglinesController < ApplicationController
  def index
    @sluglines = Slugline.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @sluglines }
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
