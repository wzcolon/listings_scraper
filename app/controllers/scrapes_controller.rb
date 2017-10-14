class ScrapesController < ApplicationController
  def show
    @search = scrape.listings.ransack(params[:q])

    @listings= @search.result(distinct: true).paginate(
      page: params[:page],
      per_page: 50
    )
  end

  private

  def scrape
    @scrape ||= Scrape.find(params[:id])
  end
  helper_method :scrape
end
