class ScrapesController < ApplicationController
  def show
  end

  private

  def listings
    @listings ||= scrape.listings.paginate(
      page: params[:page],
      per_page: 100
    )
  end
  helper_method :listings

  def scrape
    @scrape ||= Scrape.find(params[:id])
  end
  helper_method :scrape
end
