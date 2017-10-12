module Scrapes
  class SummaryController < ApplicationController
    def show
      @ranges = SortListingsByPrice.new(scrape).call
    end

    private

    def scrape
      @scrape ||= Scrape.find(params[:scrape_id])
    end
    helper_method :scrape
  end
end
