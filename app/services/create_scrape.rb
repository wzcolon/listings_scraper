class CreateScrape
  CouldNotScrapeError = Class.new(StandardError)

  attr_reader :scrape_type, :scrape

  def initialize(scrape_type:)
    @scrape_type = scrape_type
    @listings = 0
  end

  def call
    scrape!
  end

  private

  def scrape!
    begin
      while @listings < 1000
        results.each do |result|
          Listing.create(new_listing(result))
          @listings += 1
        end

        visit_next_page
      end
    rescue => e
      raise CouldNotScrapeError.new(e)
    end

    scrape
  end

  def results
    page.css('.result-info')
  end

  def new_listing(result)
    {
      price: result.at_css('.result-price').try(:text),
      title: result.at_css('a').try(:text),
      date: result.at_css('.result-date').try(:text),
      link: result.at_css('a').attributes['href'].try(:value),
      scrape: scrape
    }
  end

  def visit_next_page
    agent.page.link_with(text: 'next > ').click
  end

  def scrape
    @scrape ||= Scrape.create(scrape_type: scrape_type)
  end

  def page
    agent.get(url)
  end

  def agent
    @agent ||= Mechanize.new
  end

  def url
    Scrape.url_for(scrape_type)
  end
end
