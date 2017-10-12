module Api
  module V1
    class ScrapesController < ApiController
      def index
        render json: { scrapes: scrapes }, status: 200
      end

      def create
        @scrape = CreateScrape.new(scrape_type: params[:scrape_type]).call
        render json: @scrape, status: 201
      end

      def destroy
        if scrape.destroy
          render json: {}, status: 200
        else
          render json: { error: 'Could not delete this scrape!' },
            status: 404
        end
      end

      private

      def scrapes
        @scrapes = Scrape.all.order('created_at DESC')
      end

      def scrape
        @scrape ||= Scrape.find(params[:id])
      end
    end
  end
end
