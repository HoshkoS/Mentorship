FactoryBot.define do
  factory :person do
    first_name { "MyString" }
    last_name { "MyString" }
    birthdate { "2025-03-07" }
    biography { "MyText" }
    photo { nil }
  end
end
