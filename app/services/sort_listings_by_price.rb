class SortListingsByPrice
  attr_reader :scraper, :prices

  def initialize(scraper)
    @scraper = scraper
  end

  def call
    sort_listings_by_price
  end

  private

  def sort_listings_by_price
    all_ranges.select { |_,count| count > 0 }
  end

  def all_ranges
    ranges.each_with_object({}) do |range, hsh|
      hsh[range] = prices.select { |price| price.in? range }.count
    end
  end

  def ranges
    @ranges ||= begin
      min = 0
      max = 200
      ranges_array = []

      while max < max_price
        ranges_array << Range.new(min, max)
        min += 200
        max += 200
      end

      ranges_array
    end
  end

  def max_price
    @max_price ||= prices.max
  end

  def prices
    @prices ||= begin
      listings.map(&:price).compact.map do |price|
        price.gsub('$', '').to_i
      end
    end
  end

  def listings
    @listings ||= scraper.listings
  end
end
