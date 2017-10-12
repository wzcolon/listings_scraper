require 'rails_helper'

describe CarListing do
  it { should belong_to :scrape }
  it { should validate_presence_of :scrape }
end
