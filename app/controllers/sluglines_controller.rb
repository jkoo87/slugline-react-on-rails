class SluglinesController < ApplicationController
  def home
    @sluglines = Slugline.all
  end

  def show
  end
end
